import pyrebase
 
# Firebase configuration
config = {
    "apiKey": "AIzaSyCwdqeMC26GguTwqJHWp_x0mBV4ewZWArs",
    "authDomain": "team10-f486a.firebaseapp.com",
    "databaseURL": "https://team10-f486a-default-rtdb.firebaseio.com",
    "projectId": "team10-f486a",
    "storageBucket": "team10-f486a.firebasestorage.app",
    "messagingSenderId": "444583717355",
    "appId": "1:444583717355:web:f8bea0c557d78d874f11ae",
    "measurementId": "G-5X3GNRPY0J"
}
 
def update_password():
    try:
        # Get password from user
        new_password = input("Enter the new password: ")
        
        # Confirm password
        confirm_password = input("Confirm the new password: ")
        
        if new_password != confirm_password:
            print("Passwords do not match. Please try again.")
            return
        
        # Initialize Firebase
        firebase = pyrebase.initialize_app(config)
        db = firebase.database()
        
        # Update password
        db.child("settings").update({"password": new_password})
        print(f"\nPassword successfully updated to: {new_password}")
        
    except Exception as e:
        print(f"\nError updating password: {e}")
 
if __name__ == "__main__":
    print("Password Update Tool")
    print("-------------------")
    update_password()