import { useNavigationContext } from "../context/NavigationContext";

// Gives any component access to { page, params, navigate } without prop-drilling.
export function useNavigation() {
  const { page, params, navigate } = useNavigationContext();
  return { page, params, navigate };
}
