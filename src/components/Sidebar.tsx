import type { Dispatch, SetStateAction } from "react";

import {FILTERS} from "../constants/MapConstants";
import {FilterKey} from "../models/types";

export default function Sidebar({
                                    sidebarOpen,
                                    setSidebarOpen,
                                    availabilityOpen,
                                    setAvailabilityOpen,
                                    capacityOpen,
                                    setCapacityOpen,
                                    selectFilter
                                }: {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    availabilityOpen: boolean;
    setAvailabilityOpen: Dispatch<SetStateAction<boolean>>;
    capacityOpen: boolean;
    setCapacityOpen: Dispatch<SetStateAction<boolean>>;
    selectFilter: (filterKey: FilterKey) => void;
}) {
    return (
        <aside className={`side-bar${sidebarOpen ? ' active' : ''}`}>
            <button type="button" className="close-btn" onClick={() => setSidebarOpen(false)}
                    aria-label="Close menu">
                <i className="fas fa-times"/>
            </button>

            <nav className="menu">
                <div className="item">
                    <button type="button" className="all-link" onClick={() => selectFilter(FILTERS.all)}>
                        <i className="clear-formatting"/>
                        Reset all Filters
                    </button>
                </div>

                <div className="item">
                    <button
                        type="button"
                        className="sub-btn"
                        onClick={() => setAvailabilityOpen((value) => !value)}
                    >
                        <i className="fas fa-cogs"/>
                        Filter by availability
                        <i className={`fas fa-angle-right dropdown${availabilityOpen ? ' rotate' : ''}`}/>
                    </button>
                    <div className="sub-menu" style={{display: availabilityOpen ? 'block' : 'none'}}>
                        <button type="button" className="sub-item available"
                                onClick={() => selectFilter(FILTERS.available)}>
                            Available
                        </button>
                        <button
                            type="button"
                            className="sub-item not-available"
                            onClick={() => selectFilter(FILTERS.notAvailable)}
                        >
                            Not Available
                        </button>
                    </div>
                </div>

                <div className="item">
                    <button
                        type="button"
                        className="sub-btn"
                        onClick={() => setCapacityOpen((value) => !value)}
                    >
                        <i className="fas fa-cogs"/>
                        Filter by capacity
                        <i className={`fas fa-angle-right dropdown${capacityOpen ? ' rotate' : ''}`}/>
                    </button>
                    <div className="sub-menu" style={{display: capacityOpen ? 'block' : 'none'}}>
                        <button type="button" className="sub-item one"
                                onClick={() => selectFilter(FILTERS.capacity1)}>
                            1
                        </button>
                        <button type="button" className="sub-item two"
                                onClick={() => selectFilter(FILTERS.capacity2)}>
                            2
                        </button>
                        <button type="button" className="sub-item three"
                                onClick={() => selectFilter(FILTERS.capacity3)}>
                            3
                        </button>
                        <button type="button" className="sub-item four"
                                onClick={() => selectFilter(FILTERS.capacity4)}>
                            4
                        </button>
                    </div>
                </div>
            </nav>
        </aside>
    );
}
