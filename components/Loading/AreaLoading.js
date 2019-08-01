import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { DangerZone } from 'expo';

import anim from '../../assets/loading.json';

const { Lottie } = DangerZone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class AreaLoading extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 300,
              height: 300,
            }}
            loop
            source={anim}
          />
        </View>
      </View>
    );
  }
}
