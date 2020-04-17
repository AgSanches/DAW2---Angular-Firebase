import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CollectionInterface} from "../../model/CollectionInterface";
import {SneakerCollectionService} from "../../services/sneaker-collection.service";
import {SelectableBehaviourService} from "../../services/selectable-behaviour.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SneakersService} from "../../services/sneakers.service";
declare var $:any;

@Component({
  selector: 'app-sneaker-edit-collection',
  templateUrl: './sneaker-edit-collection.component.html',
  styleUrls: ['./sneaker-edit-collection.component.scss']
})
export class SneakerEditCollectionComponent implements OnInit {
  title: string = "Editar colleción";
  private collectionForm: FormGroup;
  private sneakersIds: string[] = [];
  private sneakerCollection: CollectionInterface;
  private name;

  constructor(
    private sneakerCollectionService : SneakerCollectionService,
    private sneakersService : SneakersService,
    private selectableBehaviour : SelectableBehaviourService,
    private activatedRoute : ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const selectedIds = this.selectableBehaviour.selectSneakerForCollection.getValue();
      this.sneakerCollectionService.getCollection(params['id']).subscribe(
        (value) => {
          this.sneakerCollection = value;
          this.name = this.sneakerCollection.name;
          this.sneakerCollection.sneakers = [...new Set(selectedIds.concat(this.sneakerCollection.sneakers))];;
          this.sneakersIds = this.sneakerCollection.sneakers;

          this.collectionForm = new FormGroup({
            name: new FormControl(this.name, [Validators.required, Validators.maxLength(60)])
          });
        }
      );
    });

    this.selectableBehaviour.deleteSneakerForCollection.subscribe(
      (sneakerId: string) => {
        $("#" + sneakerId).remove();
        const index = this.sneakersIds.indexOf(sneakerId, 0);
        if (index > -1) {
          this.sneakersIds.splice(index, 1);
        }
      }
    );
  }

  editCollection(collectionForm: FormGroup): void {
    if (this.collectionForm.valid) {
      const {name} = this.collectionForm.value
      if(this.sneakersIds.length >= 2){
        this.sneakerCollection.sneakers = this.sneakersIds;
        this.sneakerCollection.name = name;
        this.sneakerCollectionService.updateCollection(this.sneakerCollection).subscribe(
          value => {
            this.router.navigate(["Content/My-Collections/"])
          }
        );
      }else{
        $("#nameInput").after(
          "<p class='col-12'>La colleción debe de tener al menos 2 sneakers</p>"
        );
      }
    }else{
      $("#nameInput").after(
        "<p class='col-12'>Este campo esta vacío</p>"
      );
    }
  }

  searchSneakersForCollection() : void{
    this.selectableBehaviour.selectSneakerForCollection.next(this.sneakersIds);
    this.router.navigate(['/Content/Search', true]);
  }
}
