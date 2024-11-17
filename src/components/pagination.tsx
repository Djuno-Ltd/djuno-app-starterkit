import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./../hooks/usePagination";
import styles from "./../styles/Pagination.module.scss";
import { ReactComponent as ArrowIcon } from "./../assets/icons/arrow-left.svg";

export type PaginationProps = {
  onPageChange: (pageNumber: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
};
const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || Number(paginationRange?.length) < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames(styles.container, { [className || ""]: className })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames(styles.item, styles.arrowLeft, {
          [styles.disabled]: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <ArrowIcon />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber, i) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li
                key={`page-item-${pageNumber}-${i}`}
                className={classnames(styles.item, styles.dots)}
              >
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              key={`page-item-${pageNumber}`}
              className={classnames(styles.item, {
                [styles.selected]: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </li>
          );
        })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames(styles.item, styles.arrowRight, {
          [styles.disabled]: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <ArrowIcon style={{ transform: "rotate(-180deg)" }} />
      </li>
    </ul>
  );
};

export default Pagination;
