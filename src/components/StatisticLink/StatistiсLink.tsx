import * as React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { EIcons, Icons } from '../Icons';
import styles from './StatisticLink.module.scss';


// Картинка и ссылка должны менять цвет при наведении.
export const StatisticLink = () => {
    const ref = useRef(null);

    return (
        <Link to="/statistic">
            <Icons name={EIcons.statistic} />
        </Link>
    );  
}

