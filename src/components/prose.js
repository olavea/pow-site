import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  "> *": {
    ...theme.typography.body2,
    maxWidth: "100%",
    marginBottom: "1em",
  },
  a: {
    color: theme.palette.secondary.dark,
  },
  h1: {
    ...theme.typography.h1,
    marginTop: "1.5em",
  },
  h2: {
    ...theme.typography.h2,
    marginTop: "1.5em",
  },
  h3: {
    ...theme.typography.h3,
    marginTop: "1.5em",
  },
  h4: {
    ...theme.typography.h4,
    marginTop: "1.5em",
  },
  h5: {
    ...theme.typography.h5,
    marginTop: "1.5em",
  },
  h6: {
    ...theme.typography.h6,
    marginTop: "1.5em",
  },
  blockquote: {
    border: `4px solid ${theme.palette.secondary.main}`,
    padding: "0.5em 1.5em",
    margin: "1em 0",
    marginBottom: "1.5em",
  },
  ul: {
    listStyle: "none",
    padding: 0,

    li: {
      margin: "0.5rem 0",
      p: {
        display: "inline",
      },
      "&:before": {
        content: "'➽'",
        display: "inline-block",
        marginRight: "0.5rem",
        color: theme.palette.secondary.main,
      },
      "> strong:first-child": {
        display: "inline-block",
        marginBottom: "0.25rem",
      },
      "&:not(:first-child) > strong:first-child": {
        marginTop: "1rem",
      },
      ">a:last-child": {
        display: "inline-block",
        marginTop: "0.5rem",
      },
    },
  },
  ol: {
    listStyle: "none",
    listStylePosition: "inside",
    padding: 0,
    counterReset: "prose-counter",
    li: {
      counterIncrement: "prose-counter",
      margin: "0.25rem 0",
      "&:before": {
        content: "counter(prose-counter) '.'",
        display: "inline-block",
        marginRight: "0.5rem",
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  },
  code: {
    fontSize: "0.8em !important",
  },
  strong: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  ".gatsby-highlight": {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  ".gatsby-resp-image-wrapper": {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

export const Prose = ({ html, children, ...props }) => {
  return (
    <Box {...props}>
      {html && (
        <Root
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      )}
      {children && <Root>{children}</Root>}
    </Box>
  );
};
