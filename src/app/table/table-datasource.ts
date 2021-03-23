import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {Form} from '../form';
import {FormDTO} from '../form-dto';

// TODO: replace this with real data from your application

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<Form> {
  data: FormDTO[];
  paginator?: MatPaginator;
  sort?: MatSort;

  constructor(feedbackList: Form[]) {
    super();
    this.data = feedbackList;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Form[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Form[]): Form[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Form[]): Form[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data;
    // return data.sort((a, b) => {
    //   const isAsc = this.sort?.direction === 'asc';
    //   switch (this.sort?.active) {
    //     case 'name': return compare(a.id, b.id, isAsc);
    //     default: return 0;
    //   }
    // });
  }

  // tslint:disable-next-line:typedef
  public updateTable(data: Form[]) {
    this.data = data;
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: number | undefined, b: number | undefined, isAsc: boolean): number {
  // @ts-ignore
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
