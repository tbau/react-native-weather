import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import style from './Home.style.js';
import { useEffect, useState } from 'react';
import { jsdom } from 'jsdom-jscore-rn'
import {Platform} from 'react-native';
import * as locationJson from "locationData"

export default function Home() {
    let weatherArn = "https://8kg7msou58.execute-api.us-east-2.amazonaws.com/default/getWeatherAppConfig";

    let locationArray = Object.keys(locationJson).map((e) => {
        return { 'label': e, 'value': locationJson[e] }
    });

    let [currentTemp, setCurrentTemp] = useState(null);
    let [currentConditions, setCurrentConditions] = useState(null);
    let [highLow, setHighLow] = useState(null);
    let [weatherDropDownValue, setWeatherDropdownValue] = useState(null);

    let weatherDropdownOnChange = (value) => {
        setWeatherDropdownValue(value);
        callWeatherApi(value)
    }

    let callWeatherApi = (url) => {
        fetch(url)
            .then((r) => r.text()
                .then((d) => {
                    const htmlDoc = jsdom(d);
                        // .map((e) => {
                        //     return  htmlDoc.getElementsByAttribute('class',"CurrentConditions--tempValue")
                        // })
                    
                    setCurrentTemp(htmlDoc.querySelector('span[data-testid="TemperatureValue"]').textContent);
                    setCurrentConditions(htmlDoc.querySelector('div[class^="CurrentConditions--phraseValue"]').textContent);
                    setHighLow(htmlDoc.querySelector('div[class^="CurrentConditions--tempHiLoValue"]').textContent);
                }));
    };

    // useEffect(() => {
    //     fetch(weatherArn)
    //         .then((r) => r.json()
    //             .then((d) => {
    //                 locationJson = d
    //                 callWeatherApi();
    //             }));
    // }, []);


    const _renderItem = item => {
        return (
            <View style={style.item}>
                <Text style={style.textItem}>{item.label}</Text>
            </View>
        );
    };
    return (
        <>
            <Text style={style.weatherHeader}>Weather:{"\n"}</Text>
            <Text style={[style.displayLeft, style.locationContainer]}>
                <Text style={style.locationHeader}>Location:&nbsp;</Text>
                <Dropdown
                    style={style.dropdown}
                    selectedTextStyle={style.selectedTextStyle}
                    placeholderStyle={style.placeholderStyle}
                    placeholder="Choose Location"
                    dropdownPosition="bottom"
                    onChange={e => weatherDropdownOnChange(e.value)}
                    labelField="label"
                    valueField="value"
                    data={locationArray}
                    value={weatherDropDownValue}
                    renderItem={item => _renderItem(item)}
                />
                {"\n"}
            </Text>
            {
                currentTemp == null ? <Text></Text> :
                    <>
                        <Text style={style.displayLeft}>Current Temperature: {currentTemp}</Text>
                        <Text style={style.displayLeft}>Current Conditions: {currentConditions}</Text>
                        <Text style={style.displayLeft}>High/Low: {highLow} </Text>
                    </>
            }

        </>
    )
}