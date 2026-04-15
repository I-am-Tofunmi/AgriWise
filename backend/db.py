import os

class DBClient:
    def __init__(self, provider="mock"):
        self.provider = provider
        if provider == "firestore":
            from google.cloud import firestore
            self.client = firestore.Client()
            self.users = self.client.collection("users")
            self.records = self.client.collection("crop_records")
        elif provider == "supabase":
            from supabase import create_client
            url = os.getenv("SUPABASE_URL")
            key = os.getenv("SUPABASE_KEY")
            self.client = create_client(url, key)
        else:
            self._users = {}
            self._records = []

    def add_user(self, user_dict):
        if self.provider == "firestore":
            self.users.document(user_dict['id']).set(user_dict)
        elif self.provider == "supabase":
            self.client.table("users").insert(user_dict).execute()
        else:
            self._users[user_dict['id']] = user_dict

    def get_user(self, user_id):
        if self.provider == "firestore":
            doc = self.users.document(user_id).get()
            return doc.to_dict() if doc.exists else None
        elif self.provider == "supabase":
            res = self.client.table("users").select("*").eq("id", user_id).execute()
            return res.data[0] if res.data else None
        else:
            return self._users.get(user_id)

    def add_crop_record(self, user_id, record):
        if self.provider == "firestore":
            self.records.add({"user_id": user_id, **record})
        elif self.provider == "supabase":
            self.client.table("crop_records").insert({"user_id": user_id, **record}).execute()
        else:
            self._records.append({"user_id": user_id, **record})
