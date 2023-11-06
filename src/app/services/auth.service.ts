import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
    
  ) {
    this.usersCollection = db.collection('users')
    //auth.user.subscribe(console.log)
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
  } 

   public async createUser(userData: IUser) {
    const userCredentials = await this.auth.createUserWithEmailAndPassword(
      userData.email as string , userData.password as string
    )
       if(!userCredentials.user){
        throw new Error("User can't be found")
       }
    await this.usersCollection.doc(userCredentials.user.uid).set({
      name : userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    })
    
    await userCredentials.user.updateProfile({
      displayName: userData.name
    })

  }

  public async logout($event?: Event){
    if ($event) {
      $event.preventDefault()
    }
    
    await this.auth.signOut()
    
    await this.router.navigateByUrl('/')
  }
}
