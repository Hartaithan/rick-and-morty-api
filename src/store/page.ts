import { makeAutoObservable } from "mobx";
import { IInfo } from "../models/PageModel";

class Page {
  current: number = 1;
  count: number | null = null;
  next: string | null = null;
  pages: number | null = null;
  prev: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPage(page: number) {
    this.current = page;
  }

  setInfo(info: IInfo) {
    this.count = info.count;
    this.next = info.next;
    this.pages = info.pages;
    this.prev = info.prev;
  }

  resetInfo() {
    this.count = null;
    this.next = null;
    this.pages = null;
    this.prev = null;
  }
}

export default new Page();
