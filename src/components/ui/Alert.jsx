import React from "react";

export const Alert = ({ children, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-gray-100 border-gray-200",
    destructive: "bg-red-100 border-red-200 text-red-800",
  };

  return (
    <div
      className={`p-4 border rounded-lg ${variantClasses[variant]} ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className = "" }) => (
  <h5 className={`font-medium mb-1 ${className}`}>{children}</h5>
);

export const AlertDescription = ({ children, className = "" }) => (
  <div className={`text-sm ${className}`}>{children}</div>
);
