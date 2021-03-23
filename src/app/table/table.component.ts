import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {TableDataSource} from './table-datasource';
import {FormService} from '../form.service';
import {Form} from '../form';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Form>;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['#', 'Name', 'Email', 'Category', 'Text'];
  formService: FormService;
  feedbackList: Form[];

  // @ts-ignore
  constructor(@Inject(FormService) formService: FormService) {
    this.formService = formService;
    this.feedbackList = [];
    this.dataSource = new TableDataSource(this.feedbackList);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  updateTable(): void {
    this.formService.getForms().subscribe(feedbacks => this.feedbackList = feedbacks);
    this.dataSource.updateTable(this.feedbackList);
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngDoCheck(){
    this.updateTable();
  }
}
