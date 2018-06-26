/**
 * @author WMXPY
 * @overview generated by ghoti-cli
 * @fileoverview Component set Print
 */

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import Config from '../../config/config';
import { IEach, IList, IParsed, IPicture } from './interface';

import logo from '../../renderer/pages/logo';
import repairBaseLogo from './repairbaseLogo';

import * as fs from 'fs';
import * as path from 'path';

export interface IProps {
    content: IParsed;
    repairBaseId: string;
}

const s = {
    td: {
        border: '1px solid black',
    },
    th: {
        textAlign: 'center',
        border: '1px solid black',
    },
    div: {
        padding: '3px',
    },
    entireDiv: {
        border: '1px solid black',
    },
    topDiv: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tdInvisable: {
        border: '1px solid black',
    },
    tdPicture: {
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
        borderTop: '0',
        borderBottom: '0',
    },
    lowDiv: {

    },
};

export class Print extends React.Component<IProps, {}> {
    public constructor(props) {
        super(props);
        this.mapCategory = this.mapCategory.bind(this);
        this.mapStuff = this.mapStuff.bind(this);

        this.buildPicture = this.buildPicture.bind(this);
        this.mapPicture = this.mapPicture.bind(this);
        this.renderRestOfPictures = this.renderRestOfPictures.bind(this);
    }

    public render() {
        return (<div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    flex: 1,
                }}>
                    <div>
                        <img src={repairBaseLogo} alt="logo" style={{
                            width: 'auto',
                            height: '80px',
                        }} />
                    </div>
                    <div style={{
                        fontSize: '21px',
                    }}>
                        Property Address:
                    </div>
                    <div>
                        {this.props.content.name}
                    </div>
                    <div>
                        {this.props.content.address}
                    </div>
                    <div>
                        {this.props.content.city}
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '40%', textAlign: 'right' }}>Date:</td>
                                <td style={{ textAlign: 'right' }}>{this.props.content.bdate}</td>
                            </tr>
                            {this.props.repairBaseId ? <tr>
                                <td style={{ width: '40%', textAlign: 'right' }}>RepairBase ID:</td>
                                <td style={{ textAlign: 'right' }}>{this.props.repairBaseId}</td>
                            </tr> : void 0}
                        </tbody>
                    </table>
                </div>
            </div>
            {this.getHr()}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '32px',
                marginBottom: '32px',
            }}>
                <div style={{ flex: 5 }}>
                    <div style={{
                        fontSize: '21px',
                    }}>Property Characteristics:</div>
                    <table style={{
                        border: "1px solid black",
                        width: '100%',
                        borderCollapse: 'collapse',
                    }}>
                        <tbody>
                            {/* {this.getTr("Name", this.props.content.name)}
                                {this.getTr("Address", this.props.content.address)}
                                {this.getTr("City, State, Zip", this.props.content.city)} */}
                            {this.getTr("Year Built", this.props.content.year)}
                            {this.getTr("Stories", this.props.content.stories)}
                            {this.getTr("Living Area", this.props.content.area)}
                            {this.getTr("Total Cost", this.props.content.totalCost, true)}
                        </tbody>
                    </table>
                </div>
                <div style={{
                    flex: 1,
                    padding: '8px',
                }}>
                    <img src={logo} alt="logo" style={{
                        width: 'auto',
                        height: 'auto',
                    }} />
                </div>
                <div style={{
                    flex: 4,
                    paddingLeft: '8px',
                    paddingTop: '20px',
                    display: 'inline',
                    fontSize: '20px',
                    color: 'darkblue',
                    fontWeight: 'bold',
                }}>
                    Document presented by Repair and Preservation Network LLC.
                </div>
            </div>
            {this.getHr()}
            <div style={{
                fontSize: '21px',
                textAlign: 'center',
            }}>Repair Estimate</div>
            {this.getHr()}
            <div style={{ marginTop: '20px' }}></div>
            {this.props.content.list.map(this.mapCategory)}
            {this.renderRestOfPictures(this.props.content.unused.Exterior, 'Entire House - Exterior')}
            {this.renderRestOfPictures(this.props.content.unused.Interior, 'Entire House - Interior')}
            {this.renderRestOfPictures(this.props.content.unused.Other, 'Entire House - Others')}
            <div style={{
                marginTop: '10px',
                backgroundColor: 'black',
                color: 'white',
                width: '100%',
                textAlign: 'right',
            }}>
                Data source: Bluebook International / Generate Date: {this.props.content.bdate}
            </div>
        </div>);
    }

    protected getHr() {
        return <div style={{
            marginTop: '3px',
            marginBottom: '3px',
            height: '1px',
            backgroundColor: 'black',
        }}></div>;
    }

    protected getTr(name: string, info: string, bold?: boolean) {
        return (<tr style={{
            border: "1px solid black",
            fontWeight: bold ? "bold" : "normal",
        }}>
            <td style={{
                border: "1px solid black",
                padding: '4px',
                textAlign: 'right',
            }}>{name}</td>
            <td style={{
                border: "1px solid black",
                padding: '4px',
            }}>{info}</td>
        </tr>);
    }

    protected renderRestOfPictures(picList: IPicture[], name: string) {
        if (picList.length <= 0) {
            return void 0;
        }

        return (
            <div>
                <h3>{name}</h3>
                <table
                    style={{
                        width: "100%",
                        border: "1px solid black",
                        borderCollapse: "collapse",
                    }}>
                    <tbody>
                        {this.buildPicture(picList)}
                    </tbody>
                </table>
            </div>);
    }

    protected mapCategory(value: IList, index: number) {

        let total = 0;

        for (let i of value.each) {
            total += i.cost;
        }

        return (
            <div
                key={index}>
                <h3>{value.cate}</h3>
                <table
                    style={{
                        width: "100%",
                        border: "1px solid black",
                        borderCollapse: "collapse",
                    }}>
                    <thead>
                        <tr style={{
                            borderBottom: "1px solid black",
                        }}>
                            <th style={{
                                padding: "3px",
                            }}>Item</th>
                            <th style={{
                                padding: "3px",
                            }}>Description</th>
                            <th style={{
                                padding: "3px",
                            }}>QTY</th>
                            <th style={{
                                padding: "3px",
                            }}>U/M</th>
                            <th style={{
                                padding: "3px",
                            }}>PPU</th>
                            <th style={{
                                padding: "3px",
                            }}>Cost</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {value.each.map(this.mapStuff)}
                        <tr style={{
                            borderBottom: "1px solid black",
                        }}>
                            <td colSpan={5} style={{
                                padding: "3px",
                                border: '1px solid black',
                                textAlign: 'right',
                                paddingRight: '8px',
                                fontWeight: 'bold',
                            }}>Area Total:</td>
                            <td style={{
                                padding: "3px",
                                border: '1px solid black',
                                fontWeight: 'bold',
                            }}>${total ? total.toFixed(2) : 0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>);
    }

    protected mapPicture(picture: IPicture, pictureIndex: number) {
        if (!picture) {
            return void 0;
        }
        return (<div key={pictureIndex} style={{
            flex: 1,
            minWidth: '220px',
            maxWidth: '220px',
            paddingLeft: '3px',
            paddingRight: '3px',
        }} >
            <img
                style={{
                    width: '100%',
                    height: '100px',
                }}
                src={path.resolve(picture.src)}
            />
        </div>);
    }

    protected buildPicture(pictureE: IPicture[]) {
        const picture = [...pictureE];
        let pictureList: any[] = [];
        let tempList: IPicture[] = [];
        let key = 0;
        while (picture.length > 0) {
            if (tempList.length >= 3) {
                pictureList.push(<tr key={key++}>
                    <td style={(s.tdPicture as any)} colSpan={6}>
                        <div style={s.div}>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                justifyContent: 'center',
                            }}>{tempList.map(this.mapPicture)}</div>
                        </div>
                    </td>
                </tr>);
                tempList = [];
            }
            tempList.push(picture.shift());
        }
        if (tempList.length > 0) {
            pictureList.push(<tr key={key}>
                <td style={(s.tdPicture as any)} colSpan={6}>
                    <div style={s.div}>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            justifyContent: 'center',
                        }}>{tempList.map(this.mapPicture)}</div>
                    </div>
                </td>
            </tr>);
        }
        return pictureList;
    }

    protected mapStuff(value: IEach, index: number) {
        return (<React.Fragment key={index}>
            <tr key={value.item}>
                <td style={{
                    maxWidth: '30px',
                    padding: '3px',
                    border: '1px solid black',
                }}>{value.item}</td>
                <td style={{
                    maxWidth: '300px',
                    padding: '3px',
                    border: '1px solid black',
                }}>
                    <div>{value.description}</div>
                    {value.comments ? <div style={{
                        backgroundColor: '#dbfdff',
                        borderLeft: "5px solid #8d8dff",
                        paddingLeft: '8px',
                    }}>{value.comments}</div> : void 0}
                </td>
                <td style={{
                    padding: '3px',
                    border: '1px solid black',
                }}>{value.qty}</td>
                <td style={{
                    padding: '3px',
                    border: '1px solid black',
                }}>{value.UM}</td>
                <td style={{
                    padding: '3px',
                    border: '1px solid black',
                }}>${value.PPU}</td>
                <td style={{
                    padding: '3px',
                    border: '1px solid black',
                }}>${value.cost}</td>
                    {value.image ? this.buildPicture(value.image) : void 0}
                
            </tr>
        </React.Fragment>);
    }
}

const renderPrint = (content: IParsed, repairBaseId: string) => {
    return renderToString(<Print content={content} repairBaseId={repairBaseId} />);
};

export default renderPrint;
