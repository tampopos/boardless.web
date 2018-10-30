import * as React from 'react';
import { BarFormContent } from './bar-form-content';
import { BarList } from './bar-list';
import { Container } from 'src/components/layout/container';
import { Row } from 'src/components/layout/row';
import { Typography, createStyles } from '@material-ui/core';
import { decorate } from 'src/common/styles/styles-helper';

const styles = createStyles({
  root: {
    padding: 10,
  },
});
export const Bar = decorate(styles)(({ classes }) => {
  const { root } = classes;
  return (
    <Container className={root}>
      <Row>
        <Typography variant="h3">ルイーダの酒場</Typography>
      </Row>
      <Row>
        <BarFormContent />
      </Row>
      <Row>
        <BarList />
      </Row>
    </Container>
  );
});
