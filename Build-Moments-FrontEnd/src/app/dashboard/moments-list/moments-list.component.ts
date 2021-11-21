import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from '../../shared/feed.service';

@Component({
  selector: 'app-moments-list',
  templateUrl: './moments-list.component.html',
  styleUrls: ['./moments-list.component.scss'],
})
export class MomentsListComponent implements OnInit {
  displayedColumns: string[] = [
    'serialNo',
    'imageUrl',
    'title',
    'tags',
    'actions',
  ];
  dataSource = new MatTableDataSource();
  recordsCount: number = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private feedService: FeedService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.feedService.getPosts().subscribe((res: any) => {
      this.dataSource.data = res.posts;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.recordsCount = res.totalItems;
    });
  }

  // remove(tag: string): void {
  //   const index = this.tags.indexOf(fruit);

  //   if (index >= 0) {
  //     this.fruits.splice(index, 1);
  //   }
  // }

  deletePost(id: any) {
    const dialogRef = this.dialog.open(DialogMomentDeleteDialog);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.feedService.deletePost(id).subscribe((res: any) => {
          this.toastr.success('Deleted!');
          this.feedService.getPosts().subscribe((res: any) => {
            this.dataSource = res.posts;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.recordsCount = res.totalItems;
          });
        });
      }
    });
  }
}

@Component({
  selector: 'dialog-moment-delete-dialog',
  templateUrl: './dialog-moment-delete-dialog.html',
})
export class DialogMomentDeleteDialog {
  constructor(public dialogRef: MatDialogRef<DialogMomentDeleteDialog>) {}
}
