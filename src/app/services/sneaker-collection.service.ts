import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/firestore";
import {AuthorizationService} from "./authorization.service";
import {CollectionInterface} from "../model/CollectionInterface";
import {fromPromise} from "rxjs/internal-compatibility";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SneakerInterface} from "../model/SneakerInterface";

@Injectable({
  providedIn: 'root'
})
export class SneakerCollectionService {

  private sneakerCollectionCollection : AngularFirestoreCollection<CollectionInterface>;
  private uid: string;
  private map = map((collections:DocumentChangeAction<unknown>[]) => {
    return collections.map(collection => {
      const content = collection.payload.doc.data() as CollectionInterface;
      const id = collection.payload.doc.id;
      return {id, ...content};
    });
  })


  constructor(
    private angularFirestore: AngularFirestore,
    private authorizationService: AuthorizationService,
  ) {
    this.sneakerCollectionCollection = this.angularFirestore.collection<CollectionInterface>('sneakerCollection');
    this.uid = this.authorizationService.getUid();
  }

  createSneakerCollection(collection: CollectionInterface){
    collection.uid = this.uid;
    return fromPromise(this.sneakerCollectionCollection.add(collection));
  }

  getUserCollections(uid: string): Observable<CollectionInterface[]> {
    return this.angularFirestore.collection('sneakerCollection',
      ref => ref.orderBy('name').where("uid", "==", uid))
      .snapshotChanges().pipe(this.map);
  }

  deleteCollection(id: string): Observable<any>{
    return fromPromise(this.sneakerCollectionCollection.doc(id).delete());
  }

  getCollections(): Observable<CollectionInterface[]> {
    return this.angularFirestore
      .collection('sneakerCollection', ref => ref.orderBy('created_at', 'desc'))
      .snapshotChanges().pipe(this.map);
  }

  getCollection(id:string): Observable<CollectionInterface> {
    return this.sneakerCollectionCollection.doc(id).snapshotChanges().pipe(
      map(collection => {
        const content = collection.payload.data() as CollectionInterface;
        const id = collection.payload.id;
        return {id, ...content};
      })
    );
  }

  getFavoritesCollection(): Observable<CollectionInterface[]> {
    return this.angularFirestore
      .collection('sneakerCollection', ref => {
        return ref.where('likes', 'array-contains', this.authorizationService.getUid())
      })
      .snapshotChanges().pipe(this.map);
  }

  updateLikes(collection_id: string, likes: string[] ){
    return fromPromise(this.sneakerCollectionCollection.doc(collection_id).update({likes: likes}));
  }

  updateCollection(collection: CollectionInterface): Observable<any> {
    return fromPromise(this.sneakerCollectionCollection.doc(collection.id).set(collection));
  }
}
