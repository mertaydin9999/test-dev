import ButtonInput from "../button/ButtonInput";
import styles from "../../../pages/reports/meterIndexes/AllReadIndexesPage.module.css";
const RenderPaginationButtons = ({ currentPage, totalPages, changePage }) => {
  const getAdjacentPages = (currentPage, total, adjacent = 2) => {
    let pages = [];
    for (let i = currentPage - adjacent; i <= currentPage + adjacent; i++) {
      if (i > 0 && i <= total) {
        pages.push(i);
      }
    }
    return pages;
  };
  const adjacentPages = getAdjacentPages(currentPage, totalPages);
  return (
    <>
      <ButtonInput onClick={() => changePage(1)}>İlk</ButtonInput>
      <ButtonInput onClick={() => changePage(currentPage - 1)}>
        Önceki
      </ButtonInput>
      {adjacentPages.map((page) => (
        <ButtonInput
          key={page}
          onClick={() => changePage(page)}
          className={page === currentPage ? styles.activePageButton : ""}
        >
          {page}
        </ButtonInput>
      ))}
      <ButtonInput onClick={() => changePage(currentPage + 1)}>
        Sonraki
      </ButtonInput>
      <ButtonInput onClick={() => changePage(totalPages)}>Son</ButtonInput>
    </>
  );
};
export default RenderPaginationButtons;
