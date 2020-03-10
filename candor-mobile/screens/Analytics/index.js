import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryGroup, VictoryChart, VictoryTheme, VictoryLabel, VictoryAxis } from "victory-native";

export default class Analytics extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Analytics',
        };
    };
    render() {
        return (
            <View style={styles.container}>
                <VictoryChart width={350} theme={VictoryTheme.material} >
                    <VictoryGroup
                        offset={15}
                        colorScale={["#9381ff", "#76da9e", "#eb8b55"]}>
                        <VictoryBar
                            labels={(d) => `${d.y}`}
                            labelComponent={<VictoryLabel angle={270} verticalAnchor="middle" textAnchor="start" dx={20} />}
                            cornerRadius={{ top: 5, bottom: 5 }}
                            data={[{ x: 1, y: 200, }, { x: 2, y: 114 }, { x: 3, y: 245 }, { x: 4, y: 180 }]}
                        />
                        <VictoryBar
                            labels={(d) => `${d.y}`}
                            cornerRadius={{ top: 5, bottom: 5 }}
                            labelComponent={<VictoryLabel angle={270} verticalAnchor="middle" textAnchor="start" dx={20} />}
                            data={[{ x: 1, y: 51 }, { x: 2, y: 78 }, { x: 3, y: 170 }, { x: 4, y: 200 }]}
                        />
                        <VictoryBar
                            labels={(d) => `${d.y}`}
                            cornerRadius={{ top: 5, bottom: 5 }}
                            labelComponent={<VictoryLabel angle={270} verticalAnchor="middle" textAnchor="start" dx={20} />}
                            data={[{ x: 1, y: 98 }, { x: 2, y: 92 }, { x: 3, y: 198 }, { x: 4, y: 125 }]}
                        />
                    </VictoryGroup>
                    <VictoryAxis
                        // offsetY={1}
                        tickValues={['Week 1', 'Week 2', 'Week 3', 'Week 4']}
                        style={{
                            // axis: { stroke: "#3e416a", opacity: 0.05 },
                            axis: { stroke: "none" },
                            grid: { stroke: "none" },
                            ticks: { stroke: "none" },
                        }} />
                </VictoryChart>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});