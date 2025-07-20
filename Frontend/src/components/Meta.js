import { Helmet } from "react-helmet-async";

const Meta = ({
  title = "Welcome to Proshop",
  description = "We sell the best product for cheap",
  keyword = "electronics, buy electronics, cheap electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
    </Helmet>
  );
};

export default Meta;
