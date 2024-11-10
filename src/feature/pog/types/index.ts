export type issueType = {
  title: string;
  description: string;
  image_link: string;
};
export type issueObjectType = {
  title: string;
  issues: issueType[];
};
