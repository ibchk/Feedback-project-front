import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {TableDataSource} from './table-datasource';
import {FormService} from '../form.service';
import {Form} from '../form';
import {FormDTO} from '../form-dto';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  tableSize?: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Form>;
  dataSource: TableDataSource;

  constructor(@Inject(FormService) formService: FormService) {
    this.formService = formService;
    this.feedbackList = [];
    this.dataSource = new TableDataSource(this.feedbackList);
    this.tableSize = this.feedbackList.length;
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['#', 'Name', 'Email', 'Category', 'Text'];
  formService: FormService;
  feedbackList: FormDTO[];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  updateTable(): void {
    if (this.formService.updateNeed) {
      this.formService.getForms().subscribe(feedbacks => this.feedbackList = feedbacks);
      // @ts-ignore
      if (this.tableSize < this.feedbackList.length){
        this.tableSize = this.feedbackList.length;
        this.dataSource.updateTable(this.feedbackList);
        this.paginator._changePageSize(this.paginator.pageSize);
        this.formService.updateNeed = false;
      }
    }
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngDoCheck(){
    this.updateTable();
  }
}
