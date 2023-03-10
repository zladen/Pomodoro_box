import * as React from 'react';
import { EIcons, Icons } from '../Icons';
import styles from './StatisticLink.module.scss';


// Картинка и ссылка должны менять цвет при наведении.
export const StatisticLink = () => {
    return (
        <a href="/statistic">
            <Icons name={EIcons.statistic} />
        </a>
    );  
}

