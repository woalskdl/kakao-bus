import { TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { COLOR } from './color';
import { useState } from "react";

const useBookmark = (initialIsBookmarked) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const toggleIsBookmarked = () => setIsBookmarked(!isBookmarked);

  return {
    isBookmarked,
    toggleIsBookmarked
  }
}

export default ({
  size,
  isBookmarked : isBookmarkedProp,
  onPress,
  style
}) => {
  const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp);

  return (
    <TouchableOpacity style={style} onPress={() => {
        toggleIsBookmarked();
        onPress();
      }}>
      <Ionicons
        name="star" 
        size={size} 
        color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1}
      />
    </TouchableOpacity>
  )
}