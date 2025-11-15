import Core from "./components/Core.js";

// Create the Core instance
// Используем текущий домен для loadbalancer
const loadBalancerAddress = window.location.origin;
new Core(loadBalancerAddress, 6);