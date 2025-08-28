export function fileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    Number((size / Math.pow(1024, i)).toFixed(2)) +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

export function metaToLinks(meta, baseUrl = "/") {
  const links = [];

  // Previous
  links.push({
    url: meta.previousPage ? `${baseUrl}?page=${meta.previousPage}` : null,
    label: "&laquo; Previous",
    active: false,
  });

  // Page numbers
  for (let i = 1; i <= meta.pageCount; i++) {
    links.push({
      url: i === meta.currentPage ? null : `${baseUrl}?page=${i}`,
      label: `${i}`,
      active: i === meta.currentPage,
    });
  }

  // Next
  links.push({
    url: meta.nextPage ? `${baseUrl}?page=${meta.nextPage}` : null,
    label: "Next &raquo;",
    active: false,
  });

  return links;
}
