import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import Link from "./Link";
import { Gened } from "~/app/types";
import { GetTooltip } from "~/components/GetTooltip";

const defaultValue = (info: any) => {
  const val = info.getValue() as string;
  if (val) {
    return <p className="text-center">{val}</p>;
  } else {
    return <p className="text-center">-</p>;
  }
};

const columns: ColumnDef<Gened>[] = [
  {
    header: "Course",
    accessorKey: "courseID",
    cell: (info) => {
      const courseID = info.getValue() as string;
      const id = `geneds-table-${courseID}`;
      return (
        <>
          <Link href={`/course/${courseID}`} data-tooltip-id={id}>
            {courseID}
          </Link>
          <GetTooltip id={id} children={info.row.original.desc as string} />
        </>
      );
    },
  },
  {
    header: "Course Name",
    accessorKey: "name",
    cell: (info) => {
      const name = info.getValue() as string;
      const id = `geneds-table-${name}`;
      if (name) {
        return (
          <>
            <Link
              href={`/course/${info.row.original.courseID as string}`}
              data-tooltip-id={id}
            >
              <span className="text-wrap">{name}</span>
            </Link>
            <GetTooltip id={id} children={info.row.original.desc as string} />
          </>
        );
      }
      return <p>-</p>;
    },
  },
  {
    header: "Last Instructor",
    accessorKey: "instructor",
    cell: (info) => {
      const instructor = info.getValue() as string;
      if (instructor) {
        return <Link href={`/instructor/${instructor}`}>{instructor}</Link>;
      } else {
        return <p>-</p>;
      }
    },
  },
  {
    header: "Units",
    accessorKey: "units",
    cell: defaultValue,
  },
  {
    header: "Workload",
    accessorKey: "workload",
    cell: defaultValue,
  },
  {
    header: "Teaching",
    accessorKey: "teachingRate",
    cell: defaultValue,
  },
  {
    header: "Course Rate",
    accessorKey: "courseRate",
    cell: defaultValue,
  },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: (info) => {
      const tags = info.getValue() as string[];
      if (tags) {
        return <div className="text-wrap text">{tags.join(", ")}</div>;
      } else {
        return <p>-</p>;
      }
    },
  },
];

export const GenedsDataTable = ({ data }: { data: Gened[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    sortDescFirst: false,
    state: {
      sorting,
    },
  });

  return (
    <table className="w-full min-w-fit table-auto">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className="whitespace-nowrap px-2 text-left text-sm font-semibold text-gray-700"
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.column.getIsSorted() ? (
                  <b>
                    {" "}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}{" "}
                  </b>
                ) : (
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                )}
                {{
                  asc: " ⏶",
                  desc: " ⏷",
                }[header.column.getIsSorted() as string] ?? null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row,idx) => {
          const bgColor = idx % 2 == 0 ? "bg-white" : "bg-gray-50"; 
          return (
            <tr key={row.id} className={`${bgColor} hover:bg-gray-100 dark:hover:bg-gray-200`}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="whitespace-nowrap px-3 py-1 text-sm text-gray-600"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
