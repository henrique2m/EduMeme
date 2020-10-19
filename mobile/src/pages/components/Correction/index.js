import React, { useState, useEffect } from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Animated,
} from 'react-native';

import { MaterialIcons as Icons } from '@expo/vector-icons';

const hit1 = require('../../../assets/correction/hit-1.png');
const hit2 = require('../../../assets/correction/hit-2.png');
const error1 = require('../../../assets/correction/error-1.png');
const error2 = require('../../../assets/correction/error-2.png');

function Correction({ hit, toggleModalResponseChallenge, idChallenge }) {
  const [mainY] = useState(new Animated.Value(100));
  const [meme, setMeme] = useState(null);

  function generateMeme() {
    const memesHit = [null, hit1, hit2];
    const memesError = [null, error1, error2];

    const indexMeme = Math.round(Math.random() * (2 - 1) + 1);

    const sortMeme = hit ? memesHit[indexMeme] : memesError[indexMeme];

    setMeme(sortMeme);
  }

  useEffect(() => {
    function overlapping(element, toValue, bounciness) {
      Animated.spring(element, {
        toValue: toValue,
        bounciness: bounciness,
        useNativeDriver: false,
      }).start();
    }

    generateMeme();

    overlapping(mainY, 0, 30);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          toggleModalResponseChallenge(true, {
            reloadChallenges: idChallenge,
          });
        }}
      >
        <Icons name="close" size={48} color="#fff" />
      </TouchableOpacity>
      <Animated.View style={[styles.main, { top: mainY }]}>
        {hit && meme !== null ? (
          <>
            <Image source={meme} style={[styles.image]} />
            <Text style={styles.textMain}>CORRETO!</Text>
          </>
        ) : (
          <>
            <Image
              source={meme}
              style={[styles.image, { borderColor: '#FF5B5B' }]}
            />
            <Text style={styles.textMain}>ERRADO!</Text>
          </>
        )}
      </Animated.View>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMain: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#9AFF81',
    borderWidth: 2,
  },
});

export default Correction;
