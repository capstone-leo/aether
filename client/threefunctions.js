export const renderScene = () => {
    //  raycaster set up
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(draggableObjects);
    if (intersects.length > 0) {
      if (objectSelect !== intersects[0].object) {
        if (objectSelect)
          objectSelect.material.emissive.setHex(objectSelect.currentHex);

        objectSelect = intersects[0].object;
        objectSelect.hover = true;
        objectSelect.currentHex = objectSelect.material.emissive.getHex();
        objectSelect.material.emissive.setHex(0xff0000);
      }
    } else {
      if (objectSelect)
        objectSelect.material.emissive.setHex(objectSelect.currentHex);

      objectSelect = null;
    }

    renderer.render(scene, camera);
  };