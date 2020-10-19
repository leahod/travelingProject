import { Component, OnInit, Injectable } from '@angular/core';
import { Passenger } from 'src/app/entities/passenger';
import { User } from 'src/app/entities/user';
import { travelingPassenger } from 'src/app/entities/travelingPassenger';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterationService } from 'src/app/services/registeration.service';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { Registeration } from 'src/app/entities/registeration';
import { BehaviorSubject } from 'rxjs';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import swal from 'sweetalert';
import { travelingDriver } from 'src/app/entities/travelingDriver';
import { TravelingDriverService } from 'src/app/services/traveling-driver.service';
import { Driver } from 'src/app/entities/driver';


export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

const TREE_DATA = {
  ימים: [
    'ראשון',
    'שני',
    'שלישי',
    'רביעי',
    'חמישי',
    'שישי',
    'מוצ"ש'
  ]
};

@Injectable()
export class ChecklistDatabase1 {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

@Component({
  selector: 'app-edit-traveling-d',
  templateUrl: './edit-traveling-d.component.html',
  styleUrls: ['./edit-traveling-d.component.scss'],
  providers: [ChecklistDatabase1]
})
export class EditTravelingDComponent implements OnInit {

  startDate = new Date(Date.now());
  endDate = new Date(Date.now());
  days: string = "";
  lat = 40.730610;
  lng = -73.935242;
  origin = { lat: 29.8174782, lng: -95.6814757 };
  destination = { lat: 40.6976637, lng: -74.119764 };
  waypoints = [
    { location: { lat: 39.0921167, lng: -94.8559005 } },
    { location: { lat: 41.8339037, lng: -87.8720468 } }
  ];
  driver: Driver = new Driver(null, "", 0, "", new User("", "", "", true));
  traveling: travelingDriver = new travelingDriver(null, 0, "", "", null, null, null, 0, "", "", 0, 0,true);
  format_address: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _database: ChecklistDatabase1,
    private travelingDriverService: TravelingDriverService,
    private router: Router,
    private registerationService: RegisterationService
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    _database.dataChange.subscribe(data => { this.dataSource.data = data; });
  }

  ngOnInit() {
    var slides = $('.slide');
    slides.first().before(slides.last());

    $('button').on('click', function () {
      // Get all the slides again
      slides = $('.slide');
      // Register button
      var button = $(this);
      // Register active slide
      var activeSlide = $('.active');
      // Next function
      if (button.attr('id') == 'next') {
        // Move first slide to the end so the user can keep going forward
        slides.last().after(slides.first());
        // Move active class to the right
        activeSlide.removeClass('active').next('.slide').addClass('active');
      }

      // Previous function
      if (button.attr('id') == 'previous') {
        slides.first().before(slides.last());
        activeSlide.removeClass('active').prev('.slide').addClass('active');
      }
    });

    this.setDriver();
    this.setTraveling();
  }
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;
  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  getLevel = (node: TodoItemFlatNode) => node.level;
  isExpandable = (node: TodoItemFlatNode) => node.expandable;
  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;
  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;
  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  changeDays(day: string) {
    if (this.days.includes(day)) {
      this.days = this.days.replace(day, '');
    }
    else this.days += day;
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
    switch (node.item) {
      case 'ראשון': this.changeDays('1,');
        break;
      case 'שני': this.changeDays('2,');
        break;
      case 'שלישי': this.changeDays('3,');
        break;
      case 'רביעי': this.changeDays('4,');
        break;
      case 'חמישי': this.changeDays('5,');
        break;
      case 'שישי': this.changeDays('6,');
        break;
      case 'מוצ"ש': this.changeDays('7,');
        break;
    }
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  setDriver() {
    this.driver = JSON.parse(localStorage.getItem("driver"));
  }

  setTraveling() {
    debugger;
    let id;
    this.activatedRoute.url.subscribe(url => {
      id = +this.activatedRoute.snapshot.paramMap.get('id');
    });
    this.travelingDriverService.getTravelingById(id)
      .subscribe((state: travelingDriver) => this.traveling = state);
    debugger;
    this.days = this.traveling.Weekday;
    this.driver.Id = this.traveling.DriverId;
  }

  editTraveling() {
    debugger;
    let isToday = (this.traveling.FromDate.getDate() == new Date(Date.now()).getDate()
      && this.traveling.FromDate.getFullYear() == new Date(Date.now()).getFullYear()
      && this.traveling.FromDate.getMonth() == new Date(Date.now()).getMonth());
    if (this.traveling.FromDate < new Date(Date.now()) && !isToday) {
      swal({
        title: "הזנת תאריך שגוי ",
        icon: "error"
      });
    }
    else if (this.traveling.ToDate < this.traveling.FromDate) {
      swal({
        title: "הזנת תאריך סיום הקודם לתאריך התחלה ",
        icon: "error"
      });
    }
    else {
      let registeration: Registeration;
      this.traveling.Weekday = this.days;
      this.registerationService.getRegisterationsByPassenger(this.traveling.TravelingIdDriver)
        .subscribe((state: Registeration) => registeration = state)
      if (!registeration) {
        this.travelingDriverService.updateTraveling(this.traveling).
          subscribe(state => this.router.navigate(['/suitable-passengers/' + this.traveling.TravelingIdDriver]));
      }
      else {
        swal("הצטרפת כבר לנסיעה. האם הינך רוצה בכל זאת לשנות?", {
          buttons: ["לא!", true],
        });
      }
    }
  }

  handleSourceChange(sourceAddress: Address) {
    this.traveling.Source = sourceAddress.formatted_address;
  }

  handleDestinationChange(destinationAddress: Address) {
    this.traveling.Destination = destinationAddress.formatted_address;
    let address: Address = new Address();
    address.formatted_address = this.traveling.Places;
  }

}
