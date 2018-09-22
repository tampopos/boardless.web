import * as React from 'react';
import { BarForm } from './bar-form';
import { BarList } from './bar-list';

export const Bar = () => (
  <div className="root">
    <div className="row">
      <h3>ルイーダの酒場</h3>
    </div>
    <BarForm />
    <BarList />
  </div>
);
