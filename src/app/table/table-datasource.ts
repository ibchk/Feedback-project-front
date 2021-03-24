import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {Form} from '../form';
import {FormDTO} from '../form-dto';

/**
 * Data Source for the Table view. This class should
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
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void {
  }

  /**
   * Paginate the data (client-side).
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
   * Sort the data (client-side).
   */
  private getSortedData(data: Form[]): Form[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case '#':
          return compare(a.id, b.id, isAsc);
        case 'Name':
          return compare(a.name, b.name, isAsc);
        case 'Email':
          return compare(a.email, b.email, isAsc);
        case 'Category':
          return compare(a.categoryList, b.categoryList, isAsc);
        case 'Text':
          return compare(a.text, b.text, isAsc);
        default:
          return 0;
      }
    });
  }

  /**
   * Update the data.
   */
  // tslint:disable-next-line:typedef
  public updateTable(data: Form[]) {
    this.data = data;
  }
}

/**
 * Sort comparator for numbers, strings and arrays.
 */
function compare(a: number | string | string[] | undefined, b: number | string | string[] | undefined, isAsc: boolean): number {
  // @ts-ignore
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
