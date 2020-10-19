 
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { travelingDriver } from 'src/app/entities/travelingDriver';
import { TravelingServiceService } from 'src/app/services/traveling-service.service';
import { Address1 } from 'src/app/entities/address';
import { Driver } from 'src/app/entities/driver';
import { User } from 'src/app/entities/user';
import { travelingPassenger } from 'src/app/entities/travelingPassenger';
import { TravelingPassengerService } from 'src/app/services/traveling-passenger.service';
import { Passenger } from 'src/app/entities/passenger';
import { PassengerServiceService } from 'src/app/services/passenger-service.service';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

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
export class ChecklistDatabase2 {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
   
    const data = this.buildFileTree(TREE_DATA, 0);
    this.dataChange.next(data);
  }

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ChecklistDatabase2]

})
export class RegisterComponent implements OnInit {

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

  passenger: Passenger = new Passenger(null, "", new User("", "", "", true));
  traveling: travelingPassenger = new travelingPassenger(null, 0, "", "",null, null, null, null, 0,"","",true);
  //traveling: travelingPassenger = new travelingPassenger(null, 0, "", "", null, null, null, 0, new Address(), new Address());
  format_address:string;
  
 
 
  constructor(private _database: ChecklistDatabase2, private serviceTravelingDriver: TravelingPassengerService,private roter:Router,
    private serviceTravelingPassenger: TravelingPassengerService, private servicePassenger: PassengerServiceService) {
     
  }
  
  
  ngOnInit() {
    ////////////ימים
    // data for the demo
 // when a selection is made, detach the selected option and create a checkbox and label
$('.select-to-checkbox').on('change', function(e) {
  var $select = $(this);
  $('option:selected',this).each(function(i,opt) { // multiple options might already be selected
    var $option = $(opt),
        iname = $select.attr('name'),
        $label = $('<br><label class="label-from-select">'
                   +'<input type="checkbox" class="checkbox-from-select" name="'
                   +iname+'" value="'
                   +$option.val()+'" checked>'
                   +$option.text()+'</label>')
                 .data('orig-option',$option); // store this so it can be replaced in the same spot
    if ($option.val()) { // IE may select the first option automatically
      $option.detach();
      $select.nextUntil(':not(.label-from-select)').addBack().last().after($label); // add after existing checkboxes
      if ($select.prop('required')) { // disable "required" if an option has been converted
        $select.data('is-required',true).prop('required',false);
        $label.find('.checkbox-from-select').prop('required',true);
      };
    };
  });
});
$('.select-to-checkbox').on('click','option', function(e) {
  $(this).closest('.select-to-checkbox').trigger('change');
})

// when the checkbox is unchecked, fade it out and add it back to the <select> as an option
$(document).on('change','.checkbox-from-select', function(e) {
  var $checkbox = $(this),
      iname = $checkbox.attr('name'),
      $label = $checkbox.closest('label'),
      $option = $label.data('orig-option').prop('selected',false),
      $select = $('.select-to-checkbox[name="'+iname+'"]');
  setTimeout(function() { // a delay, in case the user made a mistake and checks the box again
    if (!$checkbox.prop('checked')) {
      $label.fadeOut(800,function() { 
        var $last = $('option',$select).filter(function(i,el) {
          return $(el).data('orig-index')<$option.data('orig-index');
        }).last();
        if ($last.length) {
          $last.after($option); // re-insert the option in its original place
        } else {
          $select.prepend($option);
        };
        if ($select.data('is-required') && $select.data('orig-count')==$('option',$select).length) {
          $select.prop('required',true); 
        };
        $label.remove();
      });
    };
  },800);
  if ($checkbox.prop('checked')) { // if the checkbox is re-checked before it fades out
    $label.stop().fadeIn(3);
  }
});

// on document load, store the "orig-index" of each option in the <select>
$('.select-to-checkbox').each(function(i,sel) { 
  var ocount = $('option',sel).each(function(j,opt) {
    $(opt).data('orig-index',j);
  }).length;
  $(sel).data('orig-count',ocount) // store this in case of <select required>
    .trigger('change').prop('multiple',false).attr('size',1); // progressive enhancement
});
/////////////////////////שעון


const _formdata = [
  {
    id: 1,
    string: "string data",
    number: 10,
    boolean: 1,
    color: "#f4f4f4",
    date: "2020-04-01T10:20:25+09:00"
  }
];
//////////////////////////////////////מעבר בין דפים
 
    var slides = $('.slide');
slides.first().before(slides.last());

$('button').on('click', function() {
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
    this.setPassenger();
     
  }
  // /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  // flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  // /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  // nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  // /** A selected parent node to be inserted */
  // selectedParent: TodoItemFlatNode | null = null;

  // treeControl: FlatTreeControl<TodoItemFlatNode>;

  // treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  // dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  // /** The selection for checklist */
  // checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);



  // getLevel = (node: TodoItemFlatNode) => node.level;

  // isExpandable = (node: TodoItemFlatNode) => node.expandable;

  // getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  // hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  // hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  // /**
  //  * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
  //  */
  // transformer = (node: TodoItemNode, level: number) => {
  //   const existingNode = this.nestedNodeMap.get(node);
  //   const flatNode = existingNode && existingNode.item === node.item
  //     ? existingNode
  //     : new TodoItemFlatNode();
  //   flatNode.item = node.item;
  //   flatNode.level = level;
  //   flatNode.expandable = !!node.children;
  //   this.flatNodeMap.set(flatNode, node);
  //   this.nestedNodeMap.set(node, flatNode);
  //   return flatNode;
  // }
 

  // changeDays(day: string) {
  //   if (this.days.includes(day)) {
  //     this.days = this.days.replace(day, '');
  //   }
  //   else this.days += day;
  // }
  // // changeDays(day: string) {
  // //   if (this.traveling.weekday.includes(day)) {
  // //    this.traveling.weekday= this.traveling.weekday.replace(day, '');
  // //   }
  // //   else this.traveling.weekday += day;
  // // }

  // /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  // todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
  //   this.checklistSelection.toggle(node);
  //   this.checkAllParentsSelection(node);
  //   switch (node.item) {
  //     case 'ראשון': this.changeDays('1,');
  //       break;
  //     case 'שני': this.changeDays('2,');
  //       break;
  //     case 'שלישי': this.changeDays('3,');
  //       break;
  //     case 'רביעי': this.changeDays('4,');
  //       break;
  //     case 'חמישי': this.changeDays('5,');
  //       break;
  //     case 'שישי': this.changeDays('6,');
  //       break;
  //     case 'מוצ"ש': this.changeDays('7,');
  //       break;
  //   }
  //   console.log(this.days);
  // }



    setPassenger() {
    this.passenger = JSON.parse(localStorage.getItem("passenger"));

  }

  saveTraveling() {
    this.traveling.Weekday = this.days;
    this.traveling.PassengerId = this.passenger.Id;
    console.log(this.traveling);
     
    this.serviceTravelingPassenger.addTraveling(this.traveling).subscribe(idTravelingP=>this.roter.navigate(['/suitable-drivers/'+ idTravelingP ]));
      
  }

  handleSourceChange(sourceAddress: Address) {
    this.traveling.Source=sourceAddress.formatted_address;
  }

  handleDestinationChange(destinationAddress: Address) {
    this.traveling.Destination=destinationAddress.formatted_address;
    //  this.format_address=a.formatted_address;
    // console.log(this.format_address.split(","));
    // console.log(this.format_address[0]);
    // console.log(this.format_address[1]);
    // console.log(this.format_address[2]);
    //let address1:Address1 =new Address1(null, this.format_address[1], this.format_address[0], 0);
    let address :Address=new Address();
    address.formatted_address=this.traveling.Places;
  } 
}


