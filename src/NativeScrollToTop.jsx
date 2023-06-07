import { Image, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { createElement, useRef, useState } from "react";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const defaultStyle = {
    container: { flex: 1 },
    button: {
        alignItems: "center",
        bottom: 0,
        padding: 16,
        position: "absolute",
        right: 0
    },
    icon: {
        height: 24,
        width: 24
    }
};

export function NativeScrollToTop({ buttonBackground, contentWidgets, icon, pullDownAction, style }) {
    const scrollRef = useRef();
    const [refreshing, setRefreshing] = useState(false);
    const styles = mergeNativeStyles(defaultStyle, style);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [listViewOffset, setListViewOffset] = useState(0);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    const isCloseToTop = ({ contentOffset }) => contentOffset.y <= 20;

    function onPressTouch() {
        setButtonVisible(false);
        return scrollRef.current?.scrollTo({ y: 0, animated: true });
    }

    function onRefresh() {
        setRefreshing(true);
        if (pullDownAction && pullDownAction.canExecute) {
            pullDownAction.execute();
            if (!pullDownAction.isExecuting) {
                setRefreshing(false);
            }
        } else {
            wait(2000).then(() => setRefreshing(false));
        }
    }

    function onScroll(event) {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const direction = currentOffset > 0 && currentOffset > listViewOffset ? "down" : "up";

        if (direction === "up") {
            setButtonVisible(true);
        }

        if (direction === "down" && !isCloseToBottom(event.nativeEvent)) {
            setButtonVisible(false);
        }

        if (isCloseToTop(event.nativeEvent)) {
            setButtonVisible(false);
        }

        if (isCloseToBottom(event.nativeEvent)) {
            setButtonVisible(true);
        }

        setListViewOffset(currentOffset);
    }

    // function onScrollEndDrag() {
    //     if (!keepVisible) {
    //         setTimeout(() => fadeOut(), 5000 - 300);
    //         setTimeout(() => setButtonVisible(false), 5000);
    //     }
    // }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                ref={scrollRef}
                refreshControl={pullDownAction && <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onScroll={onScroll}
                // onScrollEndDrag={onScrollEndDrag}
            >
                {contentWidgets}
            </ScrollView>

            {buttonVisible && (
                <TouchableOpacity style={[styles.button, { backgroundColor: buttonBackground }]} onPress={onPressTouch}>
                    <Image style={styles.icon} source={icon.value} />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}
