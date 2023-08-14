import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackParamList } from '../App';

type PictureModalProps = {
  visible: boolean;
  onClose: () => void;
  imageUrl: string;
};

const PictureModal = ({ visible, onClose, imageUrl }: PictureModalProps) => {
  return (
   // will animate it up, otherwise it just insta pops.
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  modalHeader: {
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '50%',
  },
});

export default PictureModal;
