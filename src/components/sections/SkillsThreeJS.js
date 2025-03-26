import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import styled from '@emotion/styled';

const ThreeJSContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

// Physics constants - reduced for gentle movement
const DAMPING = 0.95;  // Higher damping for more stability
const ATTRACTION = 0.0005; // Very minimal center attraction to allow wandering
const REPULSION = 70;  // Increased repulsion force for more bouncing
const MIN_DISTANCE = 2.5; // Increased minimum distance between balls
const BOUNDS_PADDING = 0.95; // Utilize more of the available space
// Maximum velocity to prevent erratic movement but allow good motion
const MAX_VELOCITY = 0.1;
// Add some randomness to movement
const RANDOM_IMPULSE = 0.001;
// Gravity effect - subtle downward pull
const GRAVITY = 0.0003;

// Sphere component for skills
const SkillSphere = ({ 
  skill, 
  position,
  scale = 1,
  color,
  onHover = () => {},
  isCenter,
}) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Handle hover state
  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    onHover(skill);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    onHover(null);
    document.body.style.cursor = 'auto';
  };
  
  // Simple gentle bounce animation
  useFrame(({ clock }) => {
    if (ref.current) {
      if (isCenter) {
        // Very subtle pulse for center node
        const pulse = 1 + Math.sin(clock.getElapsedTime()) * 0.03;
        ref.current.scale.x = scale * pulse;
        ref.current.scale.y = scale * pulse;
        ref.current.scale.z = scale * pulse;
      } else {
        // Slight floating effect for other nodes
        const floatOffset = Math.sin(clock.getElapsedTime() + position[0] * 10) * 0.02;
        ref.current.position.y = position[1] + floatOffset;
      }
    }
  });
  
  const sphereScale = hovered ? scale * 1.2 : scale;
  
  return (
    <group position={position}>
      <mesh 
        ref={ref}
        scale={[sphereScale, sphereScale, sphereScale]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.4}
          metalness={0.6}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
        <Html distanceFactor={15} center>
          <div style={{
            background: hovered ? 'rgba(20, 20, 20, 0.9)' : 'rgba(20, 20, 20, 0.7)',
            padding: '6px 10px',
            borderRadius: '4px',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            transform: `scale(${hovered ? 1.1 : 1})`,
            transition: 'all 0.2s ease',
            border: hovered ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
            boxShadow: hovered ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none',
          }}>
            {skill.label}
          </div>
        </Html>
      </mesh>
    </group>
  );
};

// Connection line between nodes
const ConnectionLine = ({ start, end, color }) => {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      // Update the geometry to match current positions
      const points = [
        new THREE.Vector3(start[0], start[1], start[2]),
        new THREE.Vector3(end[0], end[1], end[2]),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      ref.current.geometry.dispose();
      ref.current.geometry = geometry;
    }
  });
  
  return (
    <line ref={ref}>
      <bufferGeometry 
        attach="geometry" 
        setFromPoints={[
          new THREE.Vector3(start[0], start[1], start[2]),
          new THREE.Vector3(end[0], end[1], end[2]),
        ]} 
      />
      <lineBasicMaterial
        attach="material"
        color={color}
        linewidth={2}
        opacity={0.6}
        transparent
      />
    </line>
  );
};

// Physics simulation for the skill nodes
const SkillNodes = ({ skillsData, onHover }) => {
  const nodes = useRef([]);
  const velocities = useRef([]);
  const connections = useRef([]);
  const { size } = useThree();
  
  // Calculate the bounding box based on canvas dimensions
  const bounds = useMemo(() => {
    const aspect = size.width / size.height;
    const height = 10;
    const width = height * aspect;
    return {
      minX: -width * BOUNDS_PADDING,
      maxX: width * BOUNDS_PADDING,
      minY: -height * BOUNDS_PADDING,
      maxY: height * BOUNDS_PADDING,
      minZ: -width * BOUNDS_PADDING,
      maxZ: width * BOUNDS_PADDING,
    };
  }, [size]);
  
  // Initialize nodes and physics system
  useEffect(() => {
    if (!skillsData || !skillsData.length) return;
    
    // Center node is always the first one
    const centerNode = {
      id: 'center',
      label: 'Skills',
      position: [0, 0, 0],
      fixed: true,  // Center node doesn't move
      velocity: [0, 0, 0],
      scale: 1.5,
      color: new THREE.Color('#2a9d8f').getHex(),
      category: 'center'
    };
    
    // Initialize all other nodes with positions throughout the 3D space
    const initialNodes = [centerNode];
    const initialVelocities = [[0, 0, 0]]; // Center node has no velocity
    
    // For each skill, create a node with full 3D distribution
    skillsData.forEach((skill, index) => {
      // Distribute nodes throughout the space more evenly
      // Use golden ratio for better distribution
      const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
      const y = 1 - (index / (skillsData.length - 1)) * 2; // -1 to 1
      const radius = Math.sqrt(1 - y * y);
      
      const theta = phi * index;
      
      // Use full range of box
      const boxSize = 8;
      const x = radius * Math.cos(theta) * boxSize;
      const z = radius * Math.sin(theta) * boxSize;
      const yPos = y * boxSize;
      
      // Set scale based on skill level, with a minimum size
      const scale = 0.3 + (skill.level / 100) * 0.7;
      
      // Set initial velocity for more immediate movement
      const initialVx = (Math.random() - 0.5) * 0.05;
      const initialVy = (Math.random() - 0.5) * 0.05;
      const initialVz = (Math.random() - 0.5) * 0.05;
      
      // Create node
      const node = {
        id: skill.id,
        label: skill.label || skill.name,
        position: [x, yPos, z],
        fixed: false,
        scale,
        color: getCategoryColor(skill.category),
        category: skill.category
      };
      
      initialNodes.push(node);
      initialVelocities.push([initialVx, initialVy, initialVz]); // Start with small random velocity
    });
    
    // Create connections
    const initialConnections = [];
    // Connect all nodes to the center
    for (let i = 1; i < initialNodes.length; i++) {
      initialConnections.push({
        source: 0, // Center node
        target: i,
        color: getCategoryLinkColor(initialNodes[i].category)
      });
    }
    
    nodes.current = initialNodes;
    velocities.current = initialVelocities;
    connections.current = initialConnections;
  }, [skillsData, bounds]);
  
  // Simplified physics simulation - gentle bouncing effect with more freedom
  useFrame(() => {
    if (nodes.current.length === 0) return;
    
    // Apply physics to each node
    for (let i = 0; i < nodes.current.length; i++) {
      const node = nodes.current[i];
      
      // Skip the center node (fixed position)
      if (node.fixed) continue;
      
      let fx = 0, fy = 0, fz = 0;
      
      // Very mild attraction to center - almost gone to allow roaming
      const dx = 0 - node.position[0];
      const dy = 0 - node.position[1];
      const dz = 0 - node.position[2];
      const distToCenter = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Only apply center attraction if very far from center
      if (distToCenter > 12) {
        fx += dx * ATTRACTION * distToCenter;
        fy += dy * ATTRACTION * distToCenter;
        fz += dz * ATTRACTION * distToCenter;
      }
      
      // Apply a slight gravity effect
      fy -= GRAVITY;
      
      // Repulsion between nodes
      for (let j = 0; j < nodes.current.length; j++) {
        if (i !== j) {
          const other = nodes.current[j];
          const dx = node.position[0] - other.position[0];
          const dy = node.position[1] - other.position[1];
          const dz = node.position[2] - other.position[2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < MIN_DISTANCE) {
            // Repulsion force is inversely proportional to distance
            const force = REPULSION / (dist * dist);
            fx += dx * force;
            fy += dy * force;
            fz += dz * force;
          }
        }
      }
      
      // Add small random impulses to create more lifelike movement
      fx += (Math.random() - 0.5) * RANDOM_IMPULSE;
      fy += (Math.random() - 0.5) * RANDOM_IMPULSE;
      fz += (Math.random() - 0.5) * RANDOM_IMPULSE;
      
      // Apply forces to velocity
      velocities.current[i][0] += fx;
      velocities.current[i][1] += fy;
      velocities.current[i][2] += fz;
      
      // Apply damping to velocity
      velocities.current[i][0] *= DAMPING;
      velocities.current[i][1] *= DAMPING;
      velocities.current[i][2] *= DAMPING;
      
      // Limit maximum velocity
      velocities.current[i][0] = Math.max(Math.min(velocities.current[i][0], MAX_VELOCITY), -MAX_VELOCITY);
      velocities.current[i][1] = Math.max(Math.min(velocities.current[i][1], MAX_VELOCITY), -MAX_VELOCITY);
      velocities.current[i][2] = Math.max(Math.min(velocities.current[i][2], MAX_VELOCITY), -MAX_VELOCITY);
      
      // Update position
      node.position[0] += velocities.current[i][0];
      node.position[1] += velocities.current[i][1];
      node.position[2] += velocities.current[i][2];
      
      // Boundary constraints with bounce - more energetic bounces
      if (node.position[0] < bounds.minX) {
        node.position[0] = bounds.minX;
        velocities.current[i][0] *= -0.9; // More energy retention on bounce
      }
      if (node.position[0] > bounds.maxX) {
        node.position[0] = bounds.maxX;
        velocities.current[i][0] *= -0.9;
      }
      if (node.position[1] < bounds.minY) {
        node.position[1] = bounds.minY;
        velocities.current[i][1] *= -0.9;
      }
      if (node.position[1] > bounds.maxY) {
        node.position[1] = bounds.maxY;
        velocities.current[i][1] *= -0.9;
      }
      if (node.position[2] < bounds.minZ) {
        node.position[2] = bounds.minZ;
        velocities.current[i][2] *= -0.9;
      }
      if (node.position[2] > bounds.maxZ) {
        node.position[2] = bounds.maxZ;
        velocities.current[i][2] *= -0.9;
      }
    }
  });
  
  return (
    <>
      {/* First render connections */}
      {connections.current.map((connection, index) => {
        const source = nodes.current[connection.source];
        const target = nodes.current[connection.target];
        return (
          <ConnectionLine 
            key={`connection-${index}`} 
            start={source.position}
            end={target.position}
            color={connection.color}
          />
        );
      })}
      
      {/* Then render nodes */}
      {nodes.current.map((node, index) => (
        <SkillSphere
          key={`node-${index}`}
          skill={node}
          position={node.position}
          scale={node.scale}
          color={node.color}
          onHover={onHover}
          isCenter={index === 0}
        />
      ))}
    </>
  );
};

// Lighting setup
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.8}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />
      <hemisphereLight
        color="#ffffff"
        groundColor="#444444"
        intensity={0.3}
      />
    </>
  );
};

// Scene component
const Scene = ({ skillsData }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <fog attach="fog" args={['#202030', 10, 30]} />
      <color attach="background" args={['#121212']} />
      <Lights />
      <SkillNodes 
        skillsData={skillsData} 
        onHover={setHoveredSkill} 
      />
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.5}
        zoomSpeed={0.7}
        minDistance={5}
        maxDistance={20}
      />
    </Canvas>
  );
};

// Helper functions
const getCategoryColor = (category) => {
  if (!category) return new THREE.Color('#4ca1af').getHex();
  
  const categoryLower = category?.toLowerCase();
  if (categoryLower?.includes('frontend')) return new THREE.Color('#4ca1af').getHex();
  if (categoryLower?.includes('backend')) return new THREE.Color('#e74c3c').getHex();
  if (categoryLower?.includes('tools') || categoryLower?.includes('technolog')) return new THREE.Color('#3498db').getHex();
  if (categoryLower?.includes('soft') || categoryLower?.includes('skill')) return new THREE.Color('#2ecc71').getHex();
  
  return new THREE.Color('#4ca1af').getHex();
};

const getCategoryLinkColor = (category) => {
  if (!category) return '#4ca1af';
  
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('frontend')) return '#4ca1af';
  if (categoryLower.includes('backend')) return '#e74c3c';
  if (categoryLower.includes('tools') || categoryLower.includes('technolog')) return '#3498db';
  if (categoryLower.includes('soft') || categoryLower.includes('skill')) return '#2ecc71';
  
  return '#4ca1af';
};

// Main component
const SkillsThreeJS = ({ skills }) => {
  const processedSkills = useMemo(() => {
    if (!skills || !skills.categories) return [];
    
    return skills.categories.flatMap(category => 
      category.skills.slice(0, 5).map(skill => ({
        id: `${category.name}-${skill.name}`.replace(/\s+/g, '-').toLowerCase(),
        name: skill.name,
        label: skill.name,
        level: skill.level || 50,
        category: category.name
      }))
    );
  }, [skills]);
  
  // Prevents errors if skills data is not ready
  if (!processedSkills || processedSkills.length === 0) {
    return (
      <ThreeJSContainer>
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          color: 'white', 
          textAlign: 'center' 
        }}>
          Loading skills...
        </div>
      </ThreeJSContainer>
    );
  }
  
  return (
    <ThreeJSContainer>
      <Scene skillsData={processedSkills} />
    </ThreeJSContainer>
  );
};

export default SkillsThreeJS; 