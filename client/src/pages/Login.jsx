import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Linkedin, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../utils/authSlice";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setError("root", { 
        type: "manual", 
        message: error 
      });
    }
  }, [error, setError]);

  const onSubmit = async (data) => {
    const loginData = {
      emailId: data.email,
      password: data.password,
    };

    try {
      await dispatch(loginUser(loginData));
    } catch (err) {
      // Error is handled by Redux and displayed via the error state
      console.error("Login failed:", err);
    }
  };

  const handleOAuthLogin = (provider) => {
    // TODO: Implement OAuth login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen space-y-4 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Sign in to continue your coding journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
         
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password Input with Eye */}
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="transition-all duration-200 focus:ring-2 focus:ring-emerald-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 top-7 flex items-center text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" onClick={() => handleOAuthLogin("Google")} className="transition-all duration-200 hover:scale-105">
              <FcGoogle className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => handleOAuthLogin("LinkedIn")} className="transition-all duration-200 hover:scale-105">
              <Linkedin className="h-4 w-4 text-blue-600" />
            </Button>
            <Button variant="outline" onClick={() => handleOAuthLogin("GitHub")} className="transition-all duration-200 hover:scale-105">
              <Github className="h-4 w-4" />
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}