import * as React from 'react';
import { BarFormContent } from './bar-form-content';
import { BarList } from './bar-list';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { Typography, createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';

const styles = createStyles({
  root: {
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'flex-start',
    '$row:last-child': {
      paddingBottom: 0,
    },
  },
  row: {
    paddingBottom: 20,
    '&:first-child': {
      paddingTop: 20,
    },
    '&:last-child': {
      paddingBottom: 0,
    },
  },
});
export const Bar = decorate(styles)(({ classes }) => {
  const { root, row } = classes;
  return (
    <Container className={root}>
      <Row className={row}>
        <Typography variant="display2">ルイーダの酒場</Typography>
      </Row>
      <Row className={row}>
        <BarFormContent />
      </Row>
      <Row className={row}>
        <BarList />
      </Row>
    </Container>
  );
});
