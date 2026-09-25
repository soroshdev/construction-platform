"use client";

import {
  ArrowDown,
  ArrowUp,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  createColumnHelper,
  useTable,
  type RowData,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features, type DataTableFeatures } from "./data-table-features";

type DataGridColumn<TData extends RowData> = {
  [K in Extract<keyof TData, string>]: {
    key: K;
    label: string;
    searchable?: boolean;
    sortable?: boolean;
    render?: (value: TData[K], row: TData) => ReactNode;
  };
}[Extract<keyof TData, string>];
type DataGridActionColumn<TData extends RowData> = {
  key: "__actions";
  label: string;
  sortable?: false;
  searchable?: false;
  render: (_value: null, row: TData) => ReactNode;
};

interface DataGridProps<TData extends RowData> {
  data: TData[];
  columns: (DataGridColumn<TData> | DataGridActionColumn<TData>)[];
  searchPlaceholder?: string;
  pageSize?: number;
  emptyMessage?: string;
}

type SortState<TData> = {
  key: Extract<keyof TData, string>;
  direction: "asc" | "desc";
} | null;

function compareValues(left: unknown, right: unknown) {
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }

  return String(left ?? "").localeCompare(String(right ?? ""), "fa", {
    numeric: true,
    sensitivity: "base",
  });
}

export function DataGrid<TData extends RowData>({
  data,
  columns,
  searchPlaceholder = "جست‌وجو...",
  pageSize: initialPageSize = 10,
  emptyMessage = "نتیجه‌ای پیدا نشد.",
}: DataGridProps<TData>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sort, setSort] = useState<SortState<TData>>(null);

  const searchableColumns = columns
    .filter(
      (column): column is DataGridColumn<TData> => column.key !== "__actions",
    )
    .filter((column) => column.searchable !== false);

  const filteredData = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("fa");

    if (!normalizedSearch) {
      return data;
    }

    return data.filter((row) =>
      searchableColumns.some((column) =>
        String(row[column.key] ?? "")
          .toLocaleLowerCase("fa")
          .includes(normalizedSearch),
      ),
    );
  }, [data, search, searchableColumns]);

  const sortedData = useMemo(() => {
    if (!sort) {
      return filteredData;
    }

    return [...filteredData].sort((left, right) => {
      const result = compareValues(left[sort.key], right[sort.key]);
      return sort.direction === "asc" ? result : -result;
    });
  }, [filteredData, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const paginatedData = sortedData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize,
  );

  const columnHelper = createColumnHelper<DataTableFeatures, TData>();
  const tableColumns = columnHelper.columns(
    columns.map((column) =>
      columnHelper.accessor(
        (row) => (column.key === "__actions" ? null : row[column.key]),
        {
          id: column.key,
          header: column.label,
          cell: (info) => {
            const value = info.getValue();
            return column.render
              ? column.render(value as never, info.row.original)
              : String(value ?? "");
          },
        },
      ),
    ),
  );

  const table = useTable({
    features,
    data: paginatedData,
    columns: tableColumns,
  });

  const toggleSort = (key: Extract<keyof TData, string>) => {
    setPage(0);
    setSort((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }

      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }

      return null;
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="text-muted-foreground absolute top-2.5 right-2 size-4" />
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(0);
            }}
            placeholder={searchPlaceholder}
            className="pr-8"
            aria-label={searchPlaceholder}
          />
        </div>

        <label className="text-muted-foreground flex items-center gap-2 text-sm">
          نمایش
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(0);
            }}
            className="h-8 rounded-md border bg-background px-2"
          >
            {[5, 10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table dir="rtl">
          <TableHeader className="bg-sidebar">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const column = columns.find(
                    (item) => item.key === header.column.id,
                  );
                  const isSorted = sort?.key === header.column.id;

                  return (
                    <TableHead key={header.id} className="text-right">
                      {header.isPlaceholder ? null : column?.key ===
                        "__actions" ? (
                        <table.FlexRender header={header} />
                      ) : column?.sortable !== false ? (
                        <button
                          type="button"
                          onClick={() =>
                            toggleSort(
                              header.column.id as Extract<keyof TData, string>,
                            )
                          }
                          className="inline-flex items-center gap-1 font-medium hover:text-foreground"
                        >
                          <table.FlexRender header={header} />
                          {isSorted &&
                            (sort.direction === "asc" ? (
                              <ArrowUp className="size-3.5" />
                            ) : (
                              <ArrowDown className="size-3.5" />
                            ))}
                        </button>
                      ) : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-right">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div
        dir="rtl"
        className="text-muted-foreground flex items-center justify-between text-sm"
      >
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setPage(0)}
            disabled={currentPage === 0}
            aria-label="صفحه اول"
          >
            <ChevronsRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={currentPage === 0}
            aria-label="صفحه قبلی"
          >
            <ArrowRightIcon />
          </Button>
          <span className="min-w-16 text-center">
            {currentPage + 1} / {pageCount}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() =>
              setPage((current) => Math.min(pageCount - 1, current + 1))
            }
            disabled={currentPage >= pageCount - 1}
            aria-label="صفحه بعدی"
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setPage(pageCount - 1)}
            disabled={currentPage >= pageCount - 1}
            aria-label="صفحه آخر"
          >
            <ChevronsLeft className="size-4" />
          </Button>
        </div>
        <span>
          {sortedData.length === 0
            ? "۰ مورد"
            : `${currentPage * pageSize + 1} تا ${Math.min(
                (currentPage + 1) * pageSize,
                sortedData.length,
              )} از ${sortedData.length}`}
        </span>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true">←</span>;
}

function ArrowLeftIcon() {
  return <span aria-hidden="true">→</span>;
}
