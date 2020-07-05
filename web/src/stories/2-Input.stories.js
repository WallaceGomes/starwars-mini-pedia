import React from 'react';
import Input from '../components/Input/index';

export default {
	title: 'Input',
	component: Input,
};

export const Default = () => <Input type='text' name='default' placeholder='Placeholder' setValue={() => { }} value='' />
