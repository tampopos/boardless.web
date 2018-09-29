import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'reflect-metadata';

enzyme.configure({ adapter: new Adapter() });
