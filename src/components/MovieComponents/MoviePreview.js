import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableScale } from '../common';
// import MovieDetailsScreen from '../../screens/Movie/MovieDetailsScreen';
import RouteNames from '../../RouteNames';
import { getW185ImageUrl } from '../../api/urls';
import Theme from '../../Theme';

const { width } = Dimensions.get('window');
const PREVIEW_WIDTH = width * 0.27;

//browse screen

class MoviePreview extends React.PureComponent {
  static getPreviewHeight = () => PREVIEW_WIDTH / Theme.specifications.posterAspectRation;

  onPress = () => {
    const { navigation, movie } = this.props;
    navigation.push(RouteNames.MovieDetailsScreen, { movie });
    // navigation.navigate(RouteNames.MovieDetailsScreen, { movie }, null, id);
  };

  renderMovie() {
    const { movie, highPriority } = this.props;
    const priority = highPriority ? FastImage.priority.high : FastImage.priority.normal;
    return (
      <View>
      <FastImage
        style={{ ...styles.image, borderColor: (/^[a-m]/i.test(movie.title)) ? 'green' : 'red' }}
        source={{ uri: getW185ImageUrl(movie.poster_path), priority }}
      />
      <Text style={styles.title}>{movie.title}</Text>
      </View>
    );
  }

  renderEmptyMovieView = () => <View style={styles.image} />;

  render() {
    const { movie, style } = this.props;

    return (
      <TouchableScale
        disabled={!movie}
        scaleFactor={0.97}
        style={[styles.container, style]}
        onPress={this.onPress}
      >
        {movie ? this.renderMovie() : this.renderEmptyMovieView()}
      </TouchableScale>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.tiny
  },
  image: {
    width: PREVIEW_WIDTH,
    aspectRatio: Theme.specifications.posterAspectRation,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: Theme.colors.transparentBlack
  },
  title: {
    width: PREVIEW_WIDTH,
    marginTop: 4,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center'
  }
});

MoviePreview.propTypes = {
  movie: PropTypes.object,
  highPriority: PropTypes.bool,
  style: PropTypes.any
};

export default withNavigation(MoviePreview);
