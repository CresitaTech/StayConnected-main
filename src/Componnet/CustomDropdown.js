import React, { memo } from 'react';
import { Platform, StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const defaultData = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
];

type Props = {
  dropdownRef?: any;
  placeholder?: string;
  data: any;
  value: any;
  labelField?: string;
  valueField?: string;
  onChange: (value: any) => void;
  tapperStyle?: ViewStyle;
  search?: boolean;
  showPrice?: boolean;
};

const CustomDropDown = (props) => {
  const {
    dropdownRef,
    placeholder = 'Select Dropdown item',
    data = defaultData,
    value,
    labelField = 'label',
    valueField = 'value',
    onChange,
    tapperStyle,
    search = false,
    showPrice = false,
  } = props;

  const renderItem = (item) => {
    const label = item[labelField] || '';
    const price = item.Price != null ? item.Price : '0.00';

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{label}</Text>
        {showPrice && <Text style={styles.itemPrice}>€{price}</Text>}
      </View>
    );
  };

  return (
    <Dropdown
      autoScroll={false}
      searchPlaceholder="Search"
      data={data}
      value={value}
      search={search}
      ref={dropdownRef}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      onChange={onChange}
      style={[styles.tapperStyle, tapperStyle]}
      containerStyle={styles.containerStyle}
      placeholderStyle={styles.placeholderStyle}
      inputSearchStyle={styles.searchInputStyle}
      searchPlaceholderTextColor="#999" 
      renderItem={renderItem}
    />
  );
};

export default memo(CustomDropDown);

const styles = StyleSheet.create({
  tapperStyle: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 12,
  },
  containerStyle: {
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 0 : -2,
  },
  placeholderStyle: {
    // fontSize: 18,
    color: '#999',
  },
  searchInputStyle: {
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderBottomColor: '#ddd',
  },
  itemLabel: {
    color: '#000', 
    flex: 0.8,
  },
  itemPrice: {
    flex: 0.2,
    color: '#000', 
    textAlign: 'right',
  },
});
