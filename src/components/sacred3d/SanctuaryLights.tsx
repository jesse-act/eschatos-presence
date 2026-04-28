const SanctuaryLights = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[0, 10, 5]}
        intensity={1.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        position={[0, -3, 2]}
        intensity={0.8}
        color="#E10600"
        distance={8}
      />
      <pointLight position={[0, 5, -5]} intensity={0.3} color="#FFFFFF" />
    </>
  );
};

export default SanctuaryLights;
