const adTypeTitle = (type: "web" | "app", title: string) => {
  if (type === "web") {
    return `웹광고_${title}`;
  } else {
    return `앱광고_${title}`;
  }
};

export default adTypeTitle;
