import * as React from 'react';
import { Link } from 'react-router-dom';
import { EIcons, Icons } from '../../../../ui/Icons/Icons';


// Картинка и ссылка должны менять цвет при наведении.
export const StatisticLink = () => {
    return (
        <Link to="/statistic">
            <Icons name={EIcons.statistic} />
        </Link>
    );  
}

