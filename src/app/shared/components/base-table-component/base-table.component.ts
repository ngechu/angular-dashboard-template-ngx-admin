import { OnInit, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { formatDate } from '@angular/common';
import { BaseComponent } from '../base-component/base-component';
import { selectedFilter } from '../../../@core/utils/helpers';




export abstract class BaseTableComponent extends BaseComponent
  implements OnInit, OnDestroy {
  public params: any;
  private pageSizeName: string;
  private pageIndexName: string;
  private pageSize = 50;
  public index = 0;
  public debouceTime = 500;
  public dataSource: MatTableDataSource<any>;
  public dataSize = 0;
  public pageSizeOptions = [10, 50, 100, 300];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    pageIndexName = 'page',
    pageSizeName = 'size',
    initialPageSize = 50,
  ) {
    super();
    this.dataSource = new MatTableDataSource([]);

    this.pageIndexName = pageIndexName;
    this.pageSizeName = pageSizeName;
    this.pageSize = initialPageSize;
    this.resetFilters();
  }

  /**
   * Initializes the component with the expected data type for your table
   * You MUST call this function in your component using super.ngOnInit();
   */
  ngOnInit() {
    this.populateTable();
  }

  /**
   * Perform clean up when we leave the page
   */
  ngOnDestroy(): void {
    this.unsubscribe();
  }

  /**
   * Utility function used to transform values returned by the date filters to any format.
   * @param date The date to format
   * @param format The format to use
   */
  formatDate(date: string | Date, format = 'dd-MM-yyyy') {
    return  date ? formatDate(date, format, 'en') : date;
  }

  /**
   * Called after fetching data from the backend.
   * @param data The result set to display on the table
   * @param totalRecords The total number of records
   */
  onPopulateTableComplete(data: any,totalRecords: number): void {
    this.dataSource.data = data;
    this.dataSource.sort = this.sort;
    this.isEmptyData = data.length === 0;
    this.dataSize = this.dataSize = totalRecords;
    this.loading = false;
  }
  // onPopulateTableComplete(data: any, totalRecords: number): void {
  //   this.dataSource.data = data;
  //   this.dataSource.sort = this.sort;
  //   this.isEmptyData = data.length === 0;
  //   this.dataSize = totalRecords;
  //   this.loading = false;
  // }

  resetFilters() {
    this.params = {
      [this.pageSizeName]: this.pageSize,
      [this.pageIndexName]: this.index,
    };
  }

  /**
   * Subscribe to the search observable to filter by search term
   * @param observableKeyword This should be name of observable, e.g Subject<string> or BehaviourSubject<string>
   * You need to use the same name as the query parameter for this to work.
   */
  registerSearchObservables(observableKeyword: string): void {
    this.registerObservables(observableKeyword, 'loading', (value: any) => {
      this.filter(observableKeyword, value);
    });
  }

  /**
   * Trigger search on a searchable field
   * @param key The name of the observable to loook for
   * @param value The value to search for.
   */
  handleSearch(key: string, value: string): void {
    this[`${key}$`].next(value);
  }

  /**
   * Subscribe to the  observable to filter by search term
   * @param observableKeyword This should be name of observable, e.g Subject<string> or BehaviourSubject<string>
   * You need to use the same name as the query parameter for this to work.
   */
  registerObservables(
    observableKeyword: string,
    loader: string,
    callback: any,
  ): void {
    this.addSubscription(
      this[`${observableKeyword}$`]
        .pipe(
          tap(_ => {
            this[loader] = true;
          }),
          debounceTime(this.debouceTime),
          tap(_ => {
            this[loader] = false;
          }),
          distinctUntilChanged(),
        )
        .subscribe((value: string) => {
          callback(value);
        }),
    );
  }

  /**
   * Filter the result on the table based on the selected key. Bind this to each field in your html
   * that requires filtering of data. (e.g date and select fields)
   * @param key The key to add to the query parameter.
   * @param value The value relating this key to filter against
   */
  public filter(key: string, value: string): void {
    this.params = selectedFilter(this.params, key, value);
    if (this.paginator) {
      this.paginator.pageIndex = this.index;
      this.params[this.pageIndexName] = this.index;
    }
    this.populateTable();
  }

  /**
   * Function called to fetch data from server and populate the table
   * Overide this with your own implementation.
   * Pass this.params as the query parameter to your service
   */
  public abstract populateTable(): void;

  /**
   * The function called to paginate the data on the table. Bind this to your paginator in the html
   * @param pageEvent The page event object passed by MatPaginator
   */
  public paginate(pageEvent: any): void {
    this.pageSize = pageEvent.pageSize;
    this.params[this.pageSizeName] = pageEvent.pageSize;
    this.params[this.pageIndexName] = pageEvent.pageIndex + this.index;
    this.populateTable();
  }
}
