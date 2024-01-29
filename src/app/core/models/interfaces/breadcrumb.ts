export interface Breadcrumb {
  list: BreadcrumbList[];
}

interface BreadcrumbList {
  label: string;
  link: string;
}
