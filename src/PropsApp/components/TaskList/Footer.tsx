import { FC, ReactNode } from "react";

const Footer: FC<{ page: number; children: ReactNode }> = ({
  page,
  children,
}) => {
  return (
    <tfoot>
      <tr>
        <td>Page: {page + 1}</td>
        <td>{children}</td>
      </tr>
    </tfoot>
  );
};

export default Footer;
