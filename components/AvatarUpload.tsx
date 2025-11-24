import React, { useState } from 'react';
import { supabase } from '../src/lib/supabaseClient';
import { Upload, Loader2, X } from 'lucide-react';
import { GlassButton } from './GlassButton';

interface AvatarUploadProps {
    url: string | null;
    onUpload: (url: string) => void;
    userId: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ url, onUpload, userId }) => {
    const [uploading, setUploading] = useState(false);

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            onUpload(data.publicUrl);

        } catch (error: any) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative group">
                {url ? (
                    <div
                        className="w-32 h-32 rounded-full bg-cover bg-center border-4 border-white/20 shadow-xl"
                        style={{ backgroundImage: `url(${url})` }}
                    />
                ) : (
                    <div className="w-32 h-32 rounded-full bg-white/5 border-4 border-white/10 flex items-center justify-center">
                        <Upload className="text-white/40" size={32} />
                    </div>
                )}

                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    {uploading ? (
                        <Loader2 className="animate-spin text-white" />
                    ) : (
                        <span className="text-white text-sm font-medium">Alterar Foto</span>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={uploadAvatar}
                        disabled={uploading}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
};
