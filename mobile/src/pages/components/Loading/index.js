import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, Animated, Image } from 'react-native';
function Loading({ colorText }) {
  const [circleOneY] = useState(new Animated.Value(0));
  const [circleTwoY] = useState(new Animated.Value(0));
  const [circleThreeY] = useState(new Animated.Value(0));
  const [footerOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    function animatedSequence() {
      const timing = (element, toValue, duration) => {
        return Animated.timing(element, {
          toValue: toValue,
          duration: duration,
          useNativeDriver: false,
        });
      };

      const overlapping = (element, toValue, bounciness) => {
        return Animated.spring(element, {
          toValue: toValue,
          bounciness: bounciness,
          useNativeDriver: false,
        });
      };

      Animated.loop(
        Animated.stagger(300, [
          timing(circleOneY, -100, 200),
          overlapping(circleOneY, 0, 30),
          timing(circleTwoY, -100, 200),
          overlapping(circleTwoY, 0, 30),
          timing(circleThreeY, -100, 200),
          overlapping(circleThreeY, 0, 30),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          timing(footerOpacity, 1, 1000),
          timing(footerOpacity, 0, 1000),
        ])
      ).start();
    }

    animatedSequence();
  }, []);

  return (
    <View style={styles.container}>
      <View />
      <View style={styles.main}>
        <Animated.View style={[styles.particle, { top: circleOneY }]}>
          <Image
            source={require('../../../assets/loading/loading1.png')}
            style={styles.image}
          />
        </Animated.View>

        <Animated.View style={[styles.particle, { top: circleTwoY }]}>
          <Image
            source={require('../../../assets/loading/loading2.png')}
            style={styles.image}
          />
        </Animated.View>

        <Animated.View style={[styles.particle, { top: circleThreeY }]}>
          <Image
            source={require('../../../assets/loading/loading3.png')}
            style={styles.image}
          />
        </Animated.View>
      </View>
      <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
        <Text style={[styles.textFooter, colorText && { color: colorText }]}>
          Estamos preparando tudo...
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  main: {
    flexDirection: 'row',
  },

  particle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#f0f',
  },

  footer: {},

  textFooter: {
    color: '#000',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Loading;
